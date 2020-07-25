import os
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from conversions import Conversions

directory = 'C:/Users/psjuk/SASearch'

os.chdir(directory)

app = Flask(__name__)

env = 'dev'

if(env == 'dev'):
    app.debug = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres@localhost/SASearch'
else:
    app.debug = False
    app.config['SQLALCHEMY_DATABASE_URI'] = ''

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Clip(db.Model):
    __tablename__ = 'clip'
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(200), unique = True)
    short_path = db.Column(db.String(200), unique = True)
    text = db.Column(db.Text(), unique = True)

    def __init__(self, name, short_path, text):
        self.name = name
        self.short_path = short_path
        self.text = text

#default server page
@app.route('/')
def landingPage():
    return render_template('index.html')

@app.route('/addClip/<fileName>', methods =['GET'])
def addClip(fileName):

    #convert mp4 file to mp3
    wav, mp3 = Conversions.convertToMp3(fileName)

    #convert mp3 to wav
    Conversions.convertToWav(wav, mp3)

    #extract text from wav file & set Clip model properties
    name, short_path, text = Conversions.extractText(wav, fileName)

    #construct Clip object + push to db if it doesn't already exist
    if (db.session.query(Clip).filter(Clip.name == name).count() == 0):
        clipObj = Clip(name, short_path, text)
        db.session.add(clipObj)
        db.session.commit()
        return 'completed!'


if(__name__ == '__main__'):
    app.run()
