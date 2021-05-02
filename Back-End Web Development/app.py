from flask import Flask, request, redirect, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import and_, func
from flask_marshmallow import Marshmallow
import json
import pandas as pd
import numpy as np
import controllers

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///gapminder.db"
db = SQLAlchemy(app)
ma = Marshmallow(app)


class Gapminder(db.Model):
    index = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String(50),nullable=True)
    year = db.Column(db.Float,nullable=True)
    agriculture = db.Column(db.Float,nullable=True)
    co2 = db.Column(db.Float,nullable=True)
    credit = db.Column(db.Float,nullable=True)
    power_consumption = db.Column(db.Float,nullable=True)
    energy_use = db.Column(db.Float,nullable=True)
    exports = db.Column(db.Float,nullable=True)
    fertility = db.Column(db.Float,nullable=True)
    gdp_growth = db.Column(db.Float,nullable=True)
    imports = db.Column(db.Float,nullable=True)
    industry =db.Column(db.Float,nullable=True)
    inflation = db.Column(db.Float,nullable=True)
    life_expectancy = db.Column(db.Float,nullable=True)
    population_density = db.Column(db.Float,nullable=True)
    services = db.Column(db.Float,nullable=True)
    pop = db.Column(db.Float,nullable=True)
    continent = db.Column(db.String(50),nullable=True)
    gdp_per_cap = db.Column(db.Float,nullable=True)
    
    def __repr__(self):
        return '<Location %r>' % self.country

class GapminderSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Gapminder


def normalize_query_param(value):
    return value if len(value) > 1 else value[0]


def normalize_query(params):
    params_non_flat = params.to_dict(flat=False)
    return {k: normalize_query_param(v) for k, v in params_non_flat.items()}
    
def search_data(request):
    params = normalize_query(request.args)
    tempKeys = []
    query_conditions = []
    
    for key,value in params.items():
        if(value.isnumeric() == True):
            params[key] = int(value)
        tempKeys.append(key.split("-"))
        tempKeys[len(tempKeys)-1].append(value)
    
    for key in tempKeys:
        if(len(key) == 2):
            query_conditions.append(getattr(Gapminder, key[0]) == key[1])
        else:
            if(key[1]== "gt"):
                query_conditions.append(getattr(Gapminder, key[0]) > int(key[2]))
            elif(key[1] == "ge"):
                query_conditions.append(getattr(Gapminder, key[0]) >= int(key[2]))
            elif(key[1] == "lt"):
                query_conditions.append(getattr(Gapminder, key[0]) < int(key[2]))
            elif(key[1] == "le"):
                query_conditions.append(getattr(Gapminder, key[0]) <= int(key[2]))
            elif(key[1] == "eq"):
                query_conditions.append(getattr(Gapminder, key[0]) == int(key[2]))
    return query_conditions

@app.route("/api/gapminder")

def gapminder():
    query_conditions = search_data(request)
    list = Gapminder.query.filter(and_(*query_conditions)).order_by(Gapminder.country).all()
    gapminder_schema = GapminderSchema(many=True)
    output = gapminder_schema.dump(list)
    return jsonify(output)

@app.route("/api/country")
def country():
    query_conditions = search_data(request)
    countries = Gapminder.query.filter(and_(*query_conditions)).order_by(Gapminder.country).all()
    country_schema = GapminderSchema(many=True)
    output = country_schema.dump(countries)
    countries_list = set()
    for item in output:
        countries_list.add(item["country"])
    countries_list = list(countries_list)
    return  jsonify({"countries": countries_list})

if __name__ == "__main__":
    app.run(debug=True)

 