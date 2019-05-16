let helper = {
    runSerial: function(tasks) {
        var result = Promise.resolve();
        tasks.forEach(task => {
            result = result.then(() => task());
        });
        return result;
    }
};

module.exports = helper;
