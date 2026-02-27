import { Router } from 'express';

const router = Router();

router.post('/', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.get('/', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.put('/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

router.delete('/:id', (req, res) => {
  res.status(501).json({ message: 'Not implemented yet' });
});

export default router;
