const handleHttpError = (res, message, code) => {
    res.status(code);
    res.status({ code: message });
}

module.export = handleHttpError;