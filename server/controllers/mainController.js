exports.homepage = async (req, res) => {
    const locals = {
        title: 'Nodejs Notes',
        description: 'Write Your thoughts'
    }
    res.render('index', {
        locals,
        layout: '../views/layouts/font-page'
    });
}

exports.about = async (req, res) => {
    const locals = {
        title: 'Nodejs Notes',
        description: 'Write Your thoughts'
    }
    res.render('about', locals);
}