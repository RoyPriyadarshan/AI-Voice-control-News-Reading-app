import React, { useEffect, useState } from 'react'
import alanBtn from '@alan-ai/alan-sdk-web'
import NewsCards from './Components/NewsCards/NewsCards'
import wordsToNumbers from 'words-to-numbers';
import {Typography} from '@material-ui/core'

const alanKey = 'de4a783131c9dccd250ba83ba0c9d9bc2e956eca572e1d8b807a3e2338fdd0dc/stage'

const App = () => {

    const [newsArticles, setNewsArticles] = useState([])
    const [activeArticle, setActiveArticle] = useState(-1)

    useEffect(() => {
        alanBtn({
            key: alanKey,
            onCommand: ({ command, articles, number }) => {
                if (command === 'newHeadlines') {
                    setNewsArticles(articles);
                    setActiveArticle(-1);
                } else if (command === 'instructions') {
                    // setIsOpen(true);
                } else if (command === 'highlight') {
                    setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
                } else if (command === 'open') {
                    const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
                    const article = articles[parsedNumber - 1];

                    if (parsedNumber > articles.length) {
                        alanBtn().playText('Please try that again...');
                    } else if (article) {
                        window.open(article.url, '_blank');
                        alanBtn().playText('Opening...');
                    } else {
                        alanBtn().playText('Please try that again...');
                    }
                }
            },
        });
    }, []);

    return (
        <div>
            <div style={{textAlign:'center',marginTop:100,marginBottom:100,fontWeight:'bolder'}}>
                <Typography variant='h2' color='textPrimary' component='h2'><strong>This is a Voice Controlled AI News reading app</strong></Typography>
                <Typography variant='body2' color='textSecondary' component='h2'></Typography>
            </div>
            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
            <div style={{textAlign:'center',marginTop:50}}>
                <p><strong>Created with &#10084;&#65039; by Priyadarshan Roy</strong></p>
            </div>
        </div>
    )
}

export default App
