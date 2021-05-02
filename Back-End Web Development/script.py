import sqlite3 as sql
import pandas as pd
import controllers

df = pd.read_csv("gapminder_clean.csv", index_col=0)

conn = sql.connect('gapminder.db')
#df.to_sql('gapminder', conn)
print(pd.read_sql('SELECT * FROM gapminder WHERE year == 1962', conn))