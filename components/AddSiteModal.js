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
    
    // 关键修改：将用户选择的categoryId作为第二个参数传递给onSave
    onSave({
      ...(editSite || {}),
      name,
      url
