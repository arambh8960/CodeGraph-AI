import React from 'react'

const RepositoryTree = ({ tree }) => {
  if (!tree || tree.length === 0) {
    return null
  }

  return (
    <div className="glass-card p-6 mt-6">
      <h3 className="text-xl font-bold text-white mb-4">
        Repository Structure
      </h3>

      <div className="max-h-96 overflow-y-auto bg-black/20 rounded-lg p-4">
        {tree.map((item, index) => (
          <div
            key={index}
            className="text-white/80 text-sm py-1 font-mono"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default RepositoryTree