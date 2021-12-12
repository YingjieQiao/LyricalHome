# Lyrical Home Project

HASS 02.110DH: The Chinese Lyrical Tradition: Arts, Literature and Landscape Design

Qiao Yingjie - 1004514

## Description

My Lyrical Home is a web-based platform, with a pre-trained deep learning model and data visualization toolkits. It is able to showcase the most common words under a chosen category, and given a word in poem, and display the top similar words to that input word, in terms of context, usage, sentiment, etc. 

There are 2 main components behind my web-based Lyrical Home: 
Deep learning model based on Word2Vec that powers the word relationship interference
Web Data Visualization platform using FastAPI, React.js, and D3.js, and Material UI.


## Walkthrough

Demo Video: https://www.youtube.com/watch?v=bp7vnyq1eAQ


## Local Development

1. install dependencies:

```bash
# backend
pip install -r requirements.txt

# frontend
npm install

```

2. start backend

```bash
cd ./backend/app
uvicorn main:app --host 0.0.0.0 --reload
```

3. start frontend

```bash
cd ./frontend
npm start
```

At this point, you can access it at http://localhost:3000/



