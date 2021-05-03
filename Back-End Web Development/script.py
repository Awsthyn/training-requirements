import sqlite3 as sql
import pandas as pd

df = pd.read_csv("gapminder_clean.csv", index_col=0)

conn = sql.connect('gapminder.db')
df.to_sql('gapminder', conn)
#print(pd.read_sql('SELECT * FROM gapminder', conn))
print(df.columns)