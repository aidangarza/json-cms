// Loadify
src => {
  return new Promise((resolve, reject) => {
    // Set the global jsonp callback to resolve
    window.readContent = resolve
    // Create a script tag
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.language = 'javascript'
    script.src = src
    // Append the script to the body
    document.head.appendChild(script);
    // Reject on error
    script.onerror = () => {
      reject(new Error('Failed to retrieve content.'))
    }
  })
}
