const BASE_URL = "https://api.twitter.com/1.1/";
const SEARCH_URL = "search/tweets.json";
import Tkn from "./token"
const TOKEN = Tkn.token
// mapper

const map_tweets = (tweets) => {
    return {
        next_results: tweets.search_metadata ? tweets.search_metadata.next_results : null,
        tweets: tweets.statuses ? tweets.statuses.map(map_tweet) : null
    }
}

const map_tweet = (tweet) => {
    return {
        id: tweet.id,
        text: tweet.text,
        imageUrl: tweet.entities.media ? tweet.entities.media[0].media_url_https : null,
        link: tweet.entities ? tweet.entities.urls ? tweet.entities.urls[0] : null : null,
        user: {
            id: tweet.user.id,
            name: tweet.user.name,
            username: tweet.user.screen_name,
            imageUrl: tweet.user.profile_image_url_https,
            link: tweet.user.url
        },
        date: tweet.created_at
    }
}


const fetch_tweet = (url) => {
    return fetch(url, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + TOKEN
        }
    })
}

const tweet_rest = (query, lang, count) => {
    let filter = "-filter:retweets";
    const url = `${BASE_URL}${SEARCH_URL}?q=${filter}%20${query}&lang=${lang}&count=${count}&include_entities=true`;
    return fetch_tweet(url);
}
const tweet_parsed = (q, callback) => {
    tweet_rest(q, "tr", 10, TOKEN)
        .then(response => response.json())
        .then(response => {
            let mapped_data = map_tweets(response);
            callback(null, { next: mapped_data.next_results, tweets: mapped_data.tweets });
        })
        .catch(error => {
            callback(error, null);
        });
}

const get_next = (next, callback) => {

    fetch_tweet(get_path(next)).then(response => response.json())
        .then(response => {
            let mapped_data = map_tweets(response);
            callback(null, { next: mapped_data.next_results, tweets: mapped_data.tweets });
        })
        .catch(error => {
            callback(error, null);
        });
}


const get_path = (params) => {
    return `${BASE_URL}${SEARCH_URL}${params}`;
}



module.exports = {
    tweet_rest,
    tweet_parsed,
    map_tweets,
    map_tweet,
    get_next
}