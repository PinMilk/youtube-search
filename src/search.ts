import Axios, {
    AxiosRequestConfig,
    AxiosResponse
} from 'axios';

class YoutubeSearch {
    /**
     * 
     * @param url Request url
     * @param config Request config
     * @private
     */
    private static async request(url: string, config: AxiosRequestConfig): Promise<AxiosResponse> {
        return await Axios.get(url, config);
    }
    /**
     * 
     * @param query Search word
     * @private
     */
    private static async getJSON(query: string, language: string): Promise<any[]> {
        const url: string = `https://m.youtube.com/results?search_query=${encodeURIComponent(query)}`;
        const response: AxiosResponse = await this.request(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
                'Accept-Language': language
            }
        });
        const html: string = response.data;
        const rawJSON: string = eval(html.split('var ytInitialData = ')[1]
            .split(';')[0]
            .replace(/(&amp;|&nbsp;)/g, ''));
        const jsonData: any[] = JSON.parse(rawJSON).contents.sectionListRenderer.contents;
        return jsonData;
    }
    /**
     * 
     * @param query Search word
     * @returns Search result(JSON)
     */
    public static async execute(query: string, language: string = 'en-US'): Promise<Array<VideoResult | ChannelResult>> {
        const result: Array<VideoResult | ChannelResult> = [];
        let jsonData: any[] = await this.getJSON(query, language);

        for (let e of jsonData) {
            if (e.itemSectionRenderer) {
                jsonData = e.itemSectionRenderer.contents;
                break;
            }
        }

        for (let n in jsonData) {
            if (Object.keys(jsonData[n]).includes('compactVideoRenderer')) {
                result.push({
                    title: jsonData[n].compactVideoRenderer.title.runs[0].text,
                    author: jsonData[n].compactVideoRenderer.longBylineText.runs[0].text,
                    view: jsonData[n].compactVideoRenderer.viewCountText.runs[0].text.replace(
                        /[가-힣ㄱ-ㅎa-zA-Z\s]/g,
                        ''
                    ),
                    running_time: jsonData[n].compactVideoRenderer.lengthText.accessibility.accessibilityData.label,
                    link: 'https://youtube.com/watch?v=' + jsonData[n].compactVideoRenderer.videoId,
                    img: jsonData[n].compactVideoRenderer.thumbnail.thumbnails[0].url,
                    published_at: jsonData[n].compactVideoRenderer.publishedTimeText.runs[0].text
                } as VideoResult);
            } else if (Object.keys(jsonData[n]).includes('compactChannelRenderer')) {
                result.push({
                    title: jsonData[n].compactChannelRenderer.displayName.runs[0].text,
                    subscribers: jsonData[n].compactChannelRenderer.subscriberCountText.runs[0].text.replace(
                        /[가-힣ㄱ-ㅎa-zA-Z\s]/g,
                        ''
                    ),
                    video: jsonData[n].compactChannelRenderer.videoCountText.runs[0].text,
                    link: 'https://youtube.com/channel/' + jsonData[n].compactChannelRenderer.channelId,
                    img: jsonData[n].compactChannelRenderer.tvBanner.thumbnails[0].url
                } as ChannelResult);
            }
        }
        return result;
    }
}

interface DefaultResult {
    title: string;
    link: string;
    img: string;
}

interface VideoResult extends DefaultResult {
    author: string;
    view: string;
    running_time: string;
    published_at: string;
}

interface ChannelResult extends DefaultResult {
    subscribers: string;
    video: string;
}

export {
    YoutubeSearch,
    VideoResult,
    ChannelResult
}
