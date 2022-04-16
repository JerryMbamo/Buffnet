from sklearn.feature_extraction.text import CountVectorizer
from nltk.stem.porter import PorterStemmer
from scipy import spatial
import pandas as pd

def stem_text(text):
  result = [] 
  stemmer = PorterStemmer()
  for word in text.split(): 
    result.append(stemmer.stem(word))
  return ' '.join(result)

def printTimeTaken(operation, start, end): 
    print(f"{operation} : {end - start} seconds") 

def recommend(movie_info):

    id = movie_info['id']
    title = movie_info['title']

    # RECCOMENDATION: making tags 
    tags = movie_info['overview'].split() + movie_info['cast_list'] + movie_info['genres'] + movie_info['keywords']

    tags = ' '.join(tags).lower()
    tags = stem_text(tags)


    # RECCOMENDATION: ADDING MOVIE TO DF
    movies_data = pd.read_csv('filtered_movies.csv')
    if any(movies_data.movie_id == id):
        movie_index = movies_data[movies_data['movie_id'] == id].index[0]
        movies_data.drop(movie_index, axis=0, inplace=True)
    
    thisMovie = {'movie_id': id, 'title': title, 'tags': tags} 
    movies_data = movies_data.append(thisMovie, ignore_index = True)

    # RECCOMENDATION: Transforming Count Vectorizer
    cv = CountVectorizer(max_features=5000, stop_words='english')
    vectors = cv.fit_transform(movies_data['tags']).toarray()

    # RECCOMENDATION: Finding cosine similarity matrix
    movie_index = movies_data[movies_data['movie_id'] == id].index[0]
    selected_vec = vectors[movie_index]
    similarity_vec = [] 
    for vector in vectors:
        angle = 1 - spatial.distance.cosine(selected_vec, vector)
        similarity_vec.append(angle)

    # RECCOMENDATION: Reccomending movies
    distances = list(enumerate(similarity_vec))
    sorted_distances = sorted(distances, reverse=True, key=lambda y:y[1])
    top_5_movies = sorted_distances[1:10]

    movieIDs = [] 

    for movie in top_5_movies: 
        movieIDs.append(int(movies_data.iloc[movie[0]].movie_id)) 

    return movieIDs 