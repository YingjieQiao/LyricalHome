from logging import debug
import os
from typing import List, Optional
from collections import Counter, defaultdict
import thulac
import pickle

import multiprocessing
from gensim.models import Word2Vec
from gensim.models.word2vec import LineSentence

from fastapi import Depends, FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def word2vec(words_file):
    save_dir = os.path.dirname((words_file))
    vector_file = os.path.join(save_dir, 'word_vectors.model')

    if os.path.exists(vector_file):
        print('find word vector file, loading directly...')
        model = Word2Vec.load(vector_file)
    else:
        print('calculating word vectors...')
        model = Word2Vec(LineSentence(words_file), vector_size=400, window=3, min_count=10,
                         workers=multiprocessing.cpu_count())
        model.save(vector_file)

    return model


def cut_qts_to_words(qts_file, saved_words_file):
    save_dir = os.path.dirname((saved_words_file))
    dumped_file = os.path.join(save_dir, 'qts_words_stat_result.pkl')

    if os.path.exists(dumped_file) and os.path.exists(saved_words_file):
        print('find preprocessed data, loading directly...')
        with open(dumped_file, 'rb') as f:
            char_counter, author_counter, vocab, word_counter, genre_counter = pickle.load(f)
    else:
        char_counter = Counter()  
        author_counter = Counter()
        vocab = set()
        word_counter = Counter()
        genre_counter = defaultdict(Counter)

        fid_save = open(saved_words_file, 'w', encoding='utf-8')
        lex_analyzer = thulac.thulac()
        line_cnt = 0
        with open(qts_file, 'r', encoding='utf-8') as f:
            for line in f:
                text_segs = line.split()
                author = text_segs[2]
                author_counter[author] += 1

                poem = text_segs[-1]
                valid_char_list = [c for c in poem if '\u4e00' <= c <= '\u9fff' or c == '???' or c == '???']
                for char in valid_char_list:
                    char_counter[char] += 1

                regularized_poem = ''.join(valid_char_list)
                word_genre_pairs = lex_analyzer.cut(regularized_poem)

                word_list = []
                for word, genre in word_genre_pairs:
                    word_list.append(word)
                    vocab.add(word)
                    word_counter[word] += 1
                    genre_counter[genre][word] += 1

                save_line = ' '.join(word_list)
                fid_save.write(save_line + '\n')

                if line_cnt % 10 == 0:
                    print('%d poets processed.' % line_cnt)
                line_cnt += 1

        fid_save.close()
        dumped_data = [char_counter, author_counter, vocab, word_counter, genre_counter]
        with open(dumped_file, 'wb') as f:
            pickle.dump(dumped_data, f)

    return char_counter, author_counter, genre_counter


def get_data():
    words_path = 'save/qts_words_list.txt'
    qts_path = 'data/qts_zhs.txt'
    save_dir = os.path.dirname(words_path)
    if not os.path.isdir(save_dir):
        os.makedirs(save_dir)

    char_counter, author_counter, genre_counter = cut_qts_to_words(qts_path, words_path)
    vector_model = word2vec(words_path)

    data = (char_counter, author_counter, genre_counter, vector_model)
    return data


def DI():
    db = get_data()
    yield db

# 1-100
@app.get("/poets/{limit}")
def get_poets(limit: int, data=Depends(DI)):
    res = {}
    author_counter = data[1]
    counter = author_counter.most_common(limit)
    if "NA" in counter:
        counter = author_counter.most_common(limit+1)
    for k, v in counter:
        if k == "NA":
            continue
        res[k] = v

    return JSONResponse(
        content=res
    )

# 1-100
@app.get("/words/{limit}")
def get_words(limit: int, data=Depends(DI)):
    res = {}
    char_counter = data[0]
    counter = char_counter.most_common(limit+2)
    for k, v in counter:
        if k == '???' or k == "???":
            continue
        res[k] = v

    return JSONResponse(
        content=res
    )


@app.get("/seasons")
def get_seasons(data=Depends(DI)):
    res = {}
    char_counter = data[0]
    for c in ['???', '???', '???', '???']:
        res[c] = char_counter[c]

    return JSONResponse(
        content=res
    )


@app.get("/colours")
def get_colours(data=Depends(DI)):
    res = {}
    char_counter = data[0]
    for c in ['???', '???', '???', '???', '???', '???', '???', '???']:
        res[c] = char_counter[c]

    return JSONResponse(
        content=res
    )
    
@app.get("/animals")
def get_animals(data=Depends(DI)):
    res = {}
    char_counter = data[0]
    for c in ['???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???']:
        res[c] = char_counter[c]

    return JSONResponse(
        content=res
    )


@app.get("/plants")
def get_plants(data=Depends(DI)):
    res = {}
    char_counter = data[0]
    for c in ['???', '???', '???', '???', '???', '???', '???', '???', '???', '???']:
        res[c] = char_counter[c]

    return JSONResponse(
        content=res
    )

@app.get("/location/{limit}")
def get_location(limit: int, data=Depends(DI)):
    res = {}
    genre_counter = data[2]
    counter = genre_counter['ns'].most_common(limit)
    if "NA" in counter:
        counter = genre_counter['ns'].most_common(limit+1)
    for k, v in counter:
        if k == "NA":
            continue
        res[k] = v

    return JSONResponse(
        content=res
    )


@app.get("/time/{limit}")
def get_time(limit: int, data=Depends(DI)):
    res = {}
    genre_counter = data[2]
    counter = genre_counter['t'].most_common(limit)
    if "NA" in counter:
        counter = genre_counter['t'].most_common(limit+1)
    for k, v in counter:
        if k == "NA":
            continue
        res[k] = v

    return JSONResponse(
        content=res
    )


@app.get("/scenario/{limit}")
def get_scenario(limit: int, data=Depends(DI)):
    res = {}
    genre_counter = data[2]
    counter = genre_counter['s'].most_common(limit)
    if "NA" in counter:
        counter = genre_counter['s'].most_common(limit+1)
    for k, v in counter:
        if k == "NA":
            continue
        res[k] = v

    return JSONResponse(
        content=res
    )


@app.get("/similarity/{word}")
def get_similar_words(word: str, data=Depends(DI)):
    res = {}
    vector_model = data[-1]
    print(word)
    for k, v in  vector_model.wv.most_similar(word):
        if k == "NA":
            continue
        res[k] = v

    nodes = {}
    for node in res.keys():
        nodes[node] = res[node] * 1000

    return JSONResponse(
        content=nodes
    )


# uvicorn main:app --host 0.0.0.0 --reload
