# Commands to memorize

```bash
pip install requests
```

```python
import requests

response = requests.get('https://api.github.com')

if response.status_code == 200:
    print('Success!')
elif response.status_code == 404:
    print('Not Found.')

if response:
    print('Success!')
else:
    print('An error has occurred.')

response.content    # bytes
response.text       # str
response.json()     # dict / list

requests.get('https://api.github.com/user', auth=('user', 'pass'))
requests.get('https://git.epam.com/api/v4/projects',
             headers={'Authorization': 'Bearer myToken'})

payload = {'key1': 'value1', 'key2': 'value2'}
r = requests.get('https://some.org/obj', params=payload)
print(r.url)
# https://some.org/obj?key2=value2&key1=value1

j = [{"name": "cat", "items": [{"num": 1, "price": 30}, {"num": 2, "price": 50}]}]
result = j[0]["items"][1]["price"]   # 50
```

```text
urllib — stdlib  https://docs.python.org/3/howto/urllib2.html
```
