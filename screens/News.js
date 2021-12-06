import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";

import NewsCard from "../components/NewsCard";


import { parseRss } from '../network/rss/Rss';

const RSS_LINK = "https://cointelegraph.com/rss/tag/blockchain/"


const News = ({ navigation }) => {
    const [news, setNews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        setIsLoading(true);
        parseRss(RSS_LINK).then(data => {
            setNews(data.news);
            setIsLoading(false);
            setError(null);
        }
        ).catch(error => {
            setError(error);
            setIsLoading(false);
        })
    }, []);

    return (
        <View style={styles.container}>
            {
                error != null ?
                    <Text>{error}</Text>
                    :
                    <FlatList
                        data={news}
                        renderItem={({ item }) => <NewsCard key={item.key} data={item} navigation={navigation} addNote={
                            () => {
                                navigation.navigate("AddNote", {
                                    params: {
                                        news: item,
                                        note: null,
                                    }
                                });
                            }
                        } isAddShow={true} />}
                    />
            }
            <ActivityIndicator style={styles.loading} size="small" color="#0000ff" animating={isLoading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    loading: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: "center",
        justifyContent: "center"
    }


});


export default News;