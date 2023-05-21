// import express from 'express'
// import { createExperience, getExperience, updateExperience } from '../controllers/experience.controller'

// const experienceRoutes = express.Router();

// experienceRoutes
//   .get('/', async (req, res) => {
//     let result = await getExperience(req);
//     res.status(200).json({
//       value: result
//     });
//   })
//   .post('/', async (req, res) => {
//     let result = await createExperience(req);
//     res.status(200).json({
//       value: result
//     });
//   })
//   .patch('/:id', async (req, res) => {
//     const result = await updateExperience(req);
//     res.status(200).json({
//       value: result
//     });
//   })

// export default experienceRoutes 