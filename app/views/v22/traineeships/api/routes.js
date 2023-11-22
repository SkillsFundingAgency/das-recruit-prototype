// Confirm key renewal
router.post('api-confirm-key', (req, res) => {
	if (req.session.data['confirm-key'] == 'yes' ) {
		res.redirect('api-hub-new-key')
	} else {
		res.redirect('api-hub')
	}
})

module.exports = router