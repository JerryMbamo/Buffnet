from flask import Flask, request, jsonify
import json
import requests
from MLquery import *
import os
from dotenv import load_dotenv
app = Flask(__name__)


def _corsify_actual_response(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route('/', methods=['GET'])
def index(): 
    return {
        'Project': 'Senior Project',
        'Route': 'Default Route'
    }


@app.route('/queryModel', methods=['POST'])
def queryModel():
    load_dotenv()

    record = json.loads(request.data)

    
    URL = 'https://api.themoviedb.org/3/movie/{}'.format(str(record['movieID']))
    PARAMS = {'api_key': os.getenv('TMDB_API_KEY')}


    # Getting overview, title and genres
    r = requests.get(url = URL, params = PARAMS)

    movie_details = r.json()

    overview = movie_details['overview']
    title = movie_details['title']
    genres = []
    for genre in movie_details['genres']:
        genres.append(genre['name'].replace(' ', ''))
    
    
    # Getting cast and crew information
    r = requests.get(url = URL + '/credits', params = PARAMS)

    cast_dict = r.json()['cast']
    crew_dict = r.json()['crew']
    cast_list = []
    for i, character in enumerate(cast_dict):
        if i < 3: 
            cast_list.append(character['name'].replace(' ', ''))
        else: 
            break 

    for crew_member in crew_dict:
        if crew_member['job'] == 'Director':
            cast_list.append(crew_member['name'].replace(' ', ''))
            break 

    # Getting keywords information 
    r = requests.get(url = URL + '/keywords', params = PARAMS)
    keywords = r.json()['keywords']
    keywords_list = [] 

    for keyword in keywords:
        keywords_list.append(keyword['name'].replace(' ', '')) 


    movie_info = {
        'id': record['movieID'],
        'overview': overview,
        'title': title, 
        'cast_list': cast_list,
        'genres': genres,
        'keywords': keywords_list
    }

    # Getting Total Recommendations time  
    recommendations = recommend(movie_info)

    result = {
        'movieRecommendations': recommendations
    } 

    return _corsify_actual_response(jsonify(result))




if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
