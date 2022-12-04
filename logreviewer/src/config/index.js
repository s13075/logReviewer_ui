const environmentUrls = new Map();

environmentUrls.set("localhost","http://localhost:8080");

export default environmentUrls.get(window.location.hostname)