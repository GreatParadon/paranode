const Controller = require('./modelImport')

exports.list = (req, res) => {
  Controller.find().exec().then((result) => {
    return res.json(result)
  }).catch((err) => {
    return res.json({error: err})
  })
}

exports.get = (req, res) => {
  const id = req.params.id

  Controller.findById(id).exec().then((result) => {
    return res.json(result)
  }).catch((err) => {
    return res.json({error: err})
  })
}

exports.store = (req, res) => {
  const data = req.body

  let LowerName = new Controller(data)
  LowerName.save().then((result) => {
    return res.json(result)
  }).catch((err) => {
    return res.json({error: err})
  })

}

exports.update = (req, res) => {
  const id = req.params.id
  const data = req.body

  Controller.findByIdAndUpdate(id, data).exec().then((result) => {
    return res.json(result)
  }).catch((err) => {
    return res.json({error: err})
  })
}

exports.destroy = (req, res) => {
  const id = req.params.id

  Controller.findByIdAndRemove(id).exec().then((result) => {
    return res.json(result)
  }).catch((err) => {
    return res.json({error: err})
  })
}