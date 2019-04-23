import pandas as pd
import psycopg2
import pandas.io.sql as sqlio


text = '1400551'

conn = psycopg2.connect(host='retina-gladys-dev-cluster.cluster-ro-cmamehlaafr7.us-east-1.rds.amazonaws.com',
                        port='5432',
                        database="gladys",
                        user="retina_master",
                        password="q6FxMS3FGHi3mOhA43rM")

sql = "SELECT * FROM orders_visits_emails WHERE user_id = '{}'".format(text)
all_user_events = sqlio.read_sql_query(sql, conn)

sql = "SELECT * FROM ltv_data WHERE user_id = '{}'".format(text)
ltv_data = sqlio.read_sql_query(sql, conn)

metric = 'Active Users'

col_converter = {
                'Active Users': 'active_this_period',
                'New Users': 'new_this_period',
                'Resurrected Users': 'resurrected_this_period',
                'Churned Users': 'churned_this_period',
                'Revenue': 'active_this_period_annualized_revenue',
                'Month':    pd.DateOffset(months=1),
                '3 Months': pd.DateOffset(months=3),
                '6 Months': pd.DateOffset(months=6),
                'Year':     pd.DateOffset(months=12),
                '2 Years':  pd.DateOffset(months=24)
                }

print('Final Stage')
sql = "SELECT * FROM ga_filterable"

ga_data = sqlio.read_sql_query(sql, conn)

print(list(ga_data.iloc[0, :]))
print(ga_data.head())
print('ok')
