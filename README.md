# PARANODE : NODE JS Framework

Server framework based on [Express](https://expressjs.com/), [Mongoose](http://mongoosejs.com/) for beginner.
Easy to generate restful feature by commandline (controller, model, route)

### Installation
```bash
$ git clone
$ cd your_dir
```

You can use Yarn or NPM
```bash
$ yarn
```
```bash
$ npm install
```

### .ENV
- Please rename `.env.example` to `.env` then fill your config
- NODE_ENV
- PORT
- DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS

### Using guide
```bash
$ yarn make {admin}
```

Serve host
```bash
$ yarn serve
```

### RESTful API after generated
| Method | URL |
| ------ | ------ |
| GET | /admin |
| GET | /admin/{id} |
| POST | /admin |
| PUT | /admin/{id} |
| DELETE | /admin/{id} |

*Recommended to using "yarn" for node package management*

*Feel free to open issues*

### ทักฮามาก็ได้เน้อถ้าคิงเป็นคนเมือง [FB](https://www.facebook.com/greatisadog)
