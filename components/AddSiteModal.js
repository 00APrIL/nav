import { useState, useEffect } from 'react'
import { FiX } from 'react-icons/fi'

const EMOJI_OPTIONS = ['🔍', '📝', '📚', '🎮', '📺', '🛒', '🔧', '💻', '🎯', '⚙️', '🚀', '🎨', '📊', '🎬', '📰', '🎵']

export default function AddSiteModal({ onClose, onSave, editSite, categories, selectedCategoryId }) {
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')
  const [icon, setIcon] = useState('🔍')
  const [categoryId, setCategoryId] = useState(selectedCategoryId || '')

  useEffect(() => {
    if (editSite) {
      setName(editSite.name || '')
      setUrl(editSite.url || '')
      setIcon(editSite.icon || '🔍')
    }
  }, [editSite])
  
  // 确保在categories为空时有合理的处理
  useEffect(() => {
    if (categories && categories.length > 0 && !categoryId) {
      setCategoryId(categories[0].id)
    }
  }, [categories, categoryId])

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // 确保URL格式正确
    let formattedUrl = url
    if (!/^https?:\/\//i.test(url)) {
      formattedUrl = 'https://' + url
    }
    
    onSave({
      ...(editSite || {}),
      name,
      url: formattedUrl,
      icon
    })
  }

  // 如果没有分类，显示一个提示
  if (!categories || categories.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4">提示</h2>
          <p>请先添加至少一个分类</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={20} />
        </button>
        
        <h2 className="text-xl font-semibold mb-4">
          {editSite ? '编辑网站' : '添加新网站'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">分类</label>
            <select 
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">网站名称</label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">网站地址</label>
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">图标</label>
            <div className="grid grid-cols-8 gap-2">
              {EMOJI_OPTIONS.map(emoji => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`text-2xl p-2 rounded ${icon === emoji ? 'bg-blue-100 border-2 border-blue-400' : 'border border-gray-200'}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              保存
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

