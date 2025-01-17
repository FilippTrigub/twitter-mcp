import {FormattedTweet, Tweet, TwitterUser, SearchResponse, PostedThread} from './types.js';

export class ResponseFormatter {
  static formatTweet(tweet: Tweet, user: TwitterUser, position: number): FormattedTweet {
    return {
      position,
      author: {
        username: user.username
      },
      content: tweet.text,
      metrics: tweet.metrics,
      url: `https://twitter.com/${user.username}/status/${tweet.id}`
    };
  }

  static formatSearchResponse(
    query: string,
    tweets: Tweet[],
    users: TwitterUser[]
  ): SearchResponse {
    const userMap = new Map(users.map(user => [user.id, user]));
    
    const formattedTweets = tweets
      .map((tweet, index) => {
        const user = userMap.get(tweet.authorId);
        if (!user) return null;
        
        return this.formatTweet(tweet, user, index + 1);
      })
      .filter((tweet): tweet is FormattedTweet => tweet !== null);

    return {
      query,
      count: formattedTweets.length,
      tweets: formattedTweets
    };
  }

  static formatThreadResponse(thread: PostedThread): string {
    const header = [
      'TWITTER THREAD POSTED',
      `Successfully posted ${thread.tweets.length} tweets`,
      `Thread URL: ${thread.threadUrl}`,
      '='
    ].join('\n');

    const tweetBlocks = thread.tweets.map((tweet, index) => [
      `Tweet #${index + 1}`,
      `Content: ${tweet.text}`,
      `ID: ${tweet.id}`,
      '='
    ].join('\n'));

    return [header, ...tweetBlocks].join('\n\n');
  }

  static toMcpResponse(response: SearchResponse): string {
    const header = [
      'TWITTER SEARCH RESULTS',
      `Query: "${response.query}"`,
      `Found ${response.count} tweets`,
      '='
    ].join('\n');

    if (response.count === 0) {
      return header + '\nNo tweets found matching your query.';
    }

    const tweetBlocks = response.tweets.map(tweet => [
      `Tweet #${tweet.position}`,
      `From: @${tweet.author.username}`,
      `Content: ${tweet.content}`,
      `Metrics: ${tweet.metrics.likes} likes, ${tweet.metrics.retweets} retweets`,
      `URL: ${tweet.url}`,
      '='
    ].join('\n'));

    return [header, ...tweetBlocks].join('\n\n');
  }
}