import requests

url = "https://wellfound.com/graphql"

def send_message_to_wellfound(cookie, message_content):
    headers = {
        "accept": "*/*",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "apollographql-client-name": "talent-web",
        "content-type": "application/json",
        "cookie": cookie,
        "origin": "https://wellfound.com",
        "priority": "u=1, i",
        "referer": "https://wellfound.com/jobs/messages/966456197",
        "sec-ch-device-memory": "8",
        "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
        "sec-ch-ua-arch": "\"x86\"",
        "sec-ch-ua-full-version-list": "\"Google Chrome\";v=\"131.0.6778.139\", \"Chromium\";v=\"131.0.6778.139\", \"Not_A Brand\";v=\"24.0.0.0\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-model": "\"\"",
        "sec-ch-ua-platform": "\"Linux\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "same-origin",
        "sec-fetch-site": "same-origin",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        "x-angellist-dd-client-referrer-resource": "/jobs/messages/:id?",
        "x-apollo-operation-name": "CandidateSendMessage",
        "x-apollo-signature": "1734591913-iPY1b1YBJnFg14WY7OcmT3KHZno4W%2Fd7trA1NzZXUk0%3D",
        "x-requested-with": "XMLHttpRequest",
    }

    payload = {
        "operationName": "CandidateSendMessage",
        "variables": {
            "input": {
                "id": "966456197",  
                "type": "JOBPAIRING",
                "body": message_content,
            }
        },
        "extensions": {
            "operationId": "tfe/1ee8d94da36a0811d05340d91a4427175dbb8abfafe2dab802483d375fdcfb7d"
        }
    }

    try:
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 200:
            return True
        else:
            print("Error:", response.status_code, response.text)
            return False
    except Exception as e:
        print("An exception occurred:", str(e))
        return False