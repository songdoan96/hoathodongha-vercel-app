hoathodongha-backend.vercel.app

<!-- NODE_ENV="development"
DATABASE_URL_MONGO="mongodb://localhost:27017/hoatho?replicaSet=rs0"

# DATABASE_URL_MONGO="mongodb+srv://root:tarikaka@cluster0.t9w6auu.mongodb.net/hoatho?retryWrites=true&w=majority&appName=Cluster0"

PORT=8888
JWT_NAME="jwt"
JWT_SECRET="d2b67382-8f59-4c5f-9536-ff96c9bd1996
JWT_EXPIRES="10d" -->

APP_URL="https://hoathodongha.vercel.app"
NODE_ENV="development"
DATABASE_URL_MONGO="mongodb://localhost:27017/hoatho?replicaSet=rs0"

# DATABASE_URL_MONGO="mongodb+srv://root:tarikaka@cluster0.t9w6auu.mongodb.net/hoatho?retryWrites=true&w=majority&appName=Cluster0"

PORT=8888
JWT_SECRET="d2b67382-8f59-4c5f-9536-ff96c9bd1996"
JWT_EXPIRES="10d"

```
JWT_SECRET="98dcb39c-ed9e-4a88-a15d-e10aa5835886"
FRONTEND_URL="https://hoathodongha.vercel.app"
FIREBASE_PROJECT_ID="hoathodongha-7aeb3"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-fbsvc@hoathodongha-7aeb3.iam.gserviceaccount.com"
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQxC3DFFDm/7Cz
nL9zsmDmdIl7OCvfznJkogr+paiFwck4lzwc++mWskG+F3Lzb3pH22AUz8q0vnxB
4zwMKZnO1yn5kuPajZf6e9Xc5McqRAO/HGjEy/7Y5hBExui/XHyWVBgQJdbFgwNV
C38Iim6jhdvPLhgeZsoJsBzTpJWB5Ls9qm3rv3wjLOlyIFATpWHEgRiCulTwZl2+
8fFcrH6IIsqA4fN/JrmonUQ1uAadYS3SwncvXk8kFtGWPrXZHCmp9UdzHK9UiTVR
6PA9oxJKe3FdrMoUVHCFMCBI8ZrlkRjq/xL8gYl+WYQYlTmiU0g8HFz9tk3hKqXo
U5TSCQ6dAgMBAAECggEACks6FG3qhVFjRZ/7grlvdL2XT9eXtjvoQRUKZL8HXb0N
7nfqk2VKgc89VaGzXdSH24YyKSSL0ri3yMnrGpBskJnkbHV1PcAQl93GUFOJjIh5
BNHiSp3ibZB+id2i+ViWnhT8cMNk4S1SGz3rYCDvTqnZilA0CT+5Q5wG99qcMqDd
P/E08x+i0L0JMvGI1l4IdTm9oujTw5R+OrX292QxzUaHr71vgqNP03YFMuJnGb/G
FxDJ7qgbW7gLXWPjwt8eUXHHYPJdHQ1ByRcpfhZDapsQ99rak/Ccm8++nci2NvSu
yNMIHVPu2jUG0XKNe+2YwuRFk4wsVFFvlKZpik5wcQKBgQD/HixLnMOtlyDOXGex
vRd8q5GrAC24h/pOa2rzWO+MUoXSZ8CrIIFgdh5g3QAC9gs0H8BGIbXMOYuuoE0t
1PFWg+YxjtQo7uydIhe9Y4b4UBKVOSC4FdD3Usu8EFELpDRZxsmabSDcEn+K0KYu
8lfcAlFPcqxlryxrqzJ6RLR91QKBgQDRfPnYSmvypEzpsVSo9h0trqVJ43pgZ+0q
DAQG+lZ1o1ivMbfcRJi3NcF/5Kc4hWZi/t8Y5UC7VbJN5zpcvcopQYpn3eMKBybi
3SezU8+xf0NiB/Z34z8uibRUkqyuLXJQqxiFU11V/aBMqYsSQSWNiev4rtOSXGT7
7OE8t9+JqQKBgQD3lt3gR/S0HK6O96j/GweXS57keRjmNLlcr+0s3EwnP9N2HpEi
wzosVpYm5XRka0r2PDZLGd4opFSGljYw26+Yigu2XupSC4aA/RxTBitwA631Omsh
nLKfxK/LBX7SMHtKAZ2YjH5OdnlnTBVsDG/uKiWlWCIt0TLoD06+0LzmPQKBgQCy
kY2HSSjrFBJbwcUgoWoN3qkWasmOFAidptBoAkxgynR2IjNPl0l2ImRm2EmSbGPy
Tr9tQT4EcfAjZ87f7we8Uxnfn8xAaAhFqa6FthN8gba2gYMefp8E1GzbCowXjLW8
/ZtRStZszl0t+/eH//A6zi5PNPcz835BIJJ+Z14swQKBgEJM9vY+wdWGuqivdrI2
tc5Ew/QfUJSUxatICgv5liHMZICDbED5jND3MWYZnkGz0/DsjgcVXHy2bEIJ1ziX
OY7ID/Yxeoz/bbsmwAyw6x4DxLWVUTieNFD01XFaa79fH56Z/WvkGn0YC4h0sjrG
SU0efstl+8HTqzsIdP1ih2Ah
-----END PRIVATE KEY-----"
JWT_EXPIRES="20d"
NODE_ENV="production"
DATABASE_URL_MONGO="mongodb+srv://root:tarikaka@cluster0.t9w6auu.mongodb.net/hoatho?retryWrites=true&w=majority&appName=Cluster0"
PORT="8888"
```
<!-- FIX LỖI Replica Set -->
### Thêm vào User env path
C:\Program Files\MongoDB\Server\x.x\bin
### Mở terminal 
net stop MongoDB
### Mở file : C:\Program Files\MongoDB\Server\x.x\bin\mongod.cfg
```
replication: 
    replSetName: "rs0"
```
### Terminal
```
mongod --config "C:\Program Files\MongoDB\Server\8.0\bin\mongod.cfg" --install 

net start MongoDB
```
### Cài mongo shell
### Terminal
```
mongosh

rs.initiate({
  _id: "rs0",
  members: [
    {
      _id: 0,
      host: "localhost:27017"
    }
  ]
})
```