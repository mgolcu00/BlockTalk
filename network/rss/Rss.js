

import axios from 'axios';
import * as rssParser from 'react-native-rss-parser';

// let parser = new Parser();

let isRnParser = true
const feed_mapper = (feed) => {
    return {
        title: feed.title,
        link: feed.link,
        language: feed.language,
        image: feed.image.url,
        news: feed.items.map(item => item_mapper(item))
    }
}
const item_mapper = (item) => {
    return {
        title: item.title,
        author: item.authors ? item.authors[0].name : '',
        pubDate: parse_date(item.published),
        link: item.links ? item.links[0].url : '',
        snippet: get_snippet(item.description),
        image: item.enclosures ? item.enclosures[0].url : '',
        key: item.id
    }
}
const get_snippet = (description) => {
    let snippet = description.split('<p>')[1].split('</p>')[0]
    return snippet
}
const parse_date = (date) => {
    let d = new Date(date)
    const format = (d) => {
        return d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear()
    }
    return format(d)
}
const parseRss = (url) => {
    if (isRnParser) {
        return axios.get(url)
            .then(response => rssParser.parse(response.data).then(feed => feed_mapper(feed)))
    } else {
        // return axios.get(url)
        //     .then(response => parser.parseString(response.data).then(feed => feed_mapper(feed)))
    }
}

module.exports = {
    parseRss
}
