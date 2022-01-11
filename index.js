import express from "express";
import cheerio  from "cheerio";
import axios from "axios";

const app = express();

const PORT = process.env.PORT || 4000;
const URL = 'https://www.theguardian.com/international'
axios(URL).then((res)=>{
    const html = res.data;
    const $ = cheerio.load(html);
    const articles = [];
    $('.fc-item__title', html).each(function(){
        const title = $(this).text();
        const url = $(this).find('a').attr('href');
        articles.push({
            title,
            url
        })
    })
    console.log(articles)
}).catch(error=>console.log(error))

app.listen(PORT, ()=>{console.log(`Server is running on PORT: ${PORT}`)});
