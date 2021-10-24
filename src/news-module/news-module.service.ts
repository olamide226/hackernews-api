/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

interface Story {
  "by": string,
  "descendants": number,
  "id": number,
  "kids": number[],
  "score": number,
  "time": number,
  "title": string,
  "type": string,
  "url": string
}

@Injectable()
export class NewsModuleService {

  // This returns top words in last 25 stories
  async getTopWordsInLast25() {
    // get new stories
    const ids: AxiosResponse<number[]> = await axios.get('https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty')
    const titles: string[] = [];
    const wordCounts = {};
    const words: string[] = [];
    let count = 0;
    let word: string;

    //loop thru ids and get story
    const getStory = ids.data.slice(0, 25).map((el) => {
        return axios.get(`https://hacker-news.firebaseio.com/v0/item/${el}.json?print=pretty`);
    });

    //get all stories in parallel and extract title
    const result = await Promise.all(getStory);
    result.map((i) =>{
      const res = i.data as Story;
      titles.push(res.title);
    });

    //parse titles into individual words
    for (const i of titles) {
      words.push(...(i.split(' ')))
    }
    for (let i = 0; i < words.length; i++)
      wordCounts[words[i].toLowerCase()] = (wordCounts[words[i].toLowerCase()] || 0) + 1;
    
    // get top word with highest occurences
    for (const key of Object.keys(wordCounts)) {
        if (wordCounts[key] > count)
          count = wordCounts[key];
          word = key;
    }
    
    return {
      type: 'success',
      highestOccuringWord: word,
      occurence: count
    };
  }

  async getTopWordsFromUsers() {
    let data: number[] = [];
    type User = {
      about: string,
      created: number,
      id: string,
      karma: string,
      submitted: number[]
    }
    // get user with 10k+ karma. no API for this so I got one user online
    const user: AxiosResponse<User> = await axios.get('https://hacker-news.firebaseio.com/v0/user/pg.json?print=pretty')
    data = user.data.submitted.slice(0,1000);
    const titles: string[] = [];
    const wordCounts = {};
    const words: string[] = [];
    let count = 0;
    let word: string;

    const getStory = data.map((el) => {
        return axios.get(`https://hacker-news.firebaseio.com/v0/item/${el}.json?print=pretty`);
    });

    const result = await Promise.all(getStory);
    result.map((i) =>{
      const res = i.data as Story;
      if(res.type == 'story'){
        titles.push(res.title);
      }
    });

    for (const i of titles.slice(0,600)) {
      if (i == undefined) continue;
      
      words.push(...(i.split(' ')));
    }
    for (let i = 0; i < words.length; i++)
      wordCounts[words[i].toLowerCase()] = (wordCounts[words[i].toLowerCase()] || 0) + 1;
    
    for (const key of Object.keys(wordCounts)) {
        if (wordCounts[key] > count)
          count = wordCounts[key];
          word = key;
    }
    
    return {
      type: 'success',
      highestOccuringWord: word,
      occurence: count
    };
  }

  getTopWordsFromLastWeek(){
    return{
      type: 'success',
      message: 'API unavailable',
    }
  }
}
