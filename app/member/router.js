const router = require('express').Router();
const memberRouter = require('./controller');

router.post('/member', memberRouter.borrowBook);
router.get('/member/all', memberRouter.getAllMembers);
router.post('/return', memberRouter.returnBook);

module.exports = router;
