import { useState, useEffect } from 'react'
import Head from 'next/head'
import { FiPlus, FiDownload, FiUpload } from 'react-icons/fi'
import AddSiteModal from '../components/AddSiteModal'
import SiteCategory from '../components/SiteCategory'

export default function Home() {
  const [categories, setCategories] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingSite, setEditingSite] = useState(null)

  // 加载数据
  useEffect(() => {
    const savedData = localStorage.getItem('navSites')
    if (savedData) {
      try {
        setCategories(JSON.parse(savedData))
      } catch (e) {
        console.error('加载数据失败', e)
        setCategories([])
      }
    } else {
      // 初始默认分类和网站
      setCategories([
        {
          id: 'default',
          name: '常用网站',
          sites: [
            { id: '1', name: 'Google', url: 'https://www.google.com', icon: '🔍' },
            { id: '2', name: 'GitHub', url: 'https://github.com', icon: '💻' },
          ]
        },
        {
          id: 'tools',
          name: '工具',
          sites: [
            { id: '3', name: 'Vercel', url: 'https://vercel.com', icon: '🚀' },
          ]
        }
      ])
    }
  }, [])

  // 保存数据
  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('navSites', JSON.stringify(categories))
    }
  }, [categories])

// 添加或编辑网站
const handleSaveSite = (site, categoryId) => {
  // 确保categoryId是有效的
  const targetCategoryId = categoryId || categories[0]?.id;
  
  // 确保有分类可用
  if (!targetCategoryId || !categories.length) {
    alert('没有可用的分类，请先添加分类');
    setShowModal(false);
    return;
  }
  
  if (editingSite) {
    // 编辑现有网站
    setCategories(categories.map(category => {
      if (category.id === targetCategoryId) {
        return {
          ...category,
          sites: category.sites.map(s => s.id === site.id ? site : s)
        }
      }
      return category
    }))
  } else {
    // 添加新网站
    setCategories(categories.map(category => {
      if (category.id === targetCategoryId) {
        return {
          ...category,
          sites: [...category.sites, { ...site, id: Date.now().toString() }]
        }
      }
      return category
    }))
  }
  setShowModal(false)
  setEditingSite(null)
}

  // 删除网站
  const handleDeleteSite = (siteId, categoryId) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          sites: category.sites.filter(site => site.id !== siteId)
        }
      }
      return category
    }))
  }

  // 编辑网站
  const handleEditSite = (site, categoryId) => {
    setEditingSite({ site, categoryId })
    setShowModal(true)
  }

  // 添加新分类
  const handleAddCategory = () => {
    const name = prompt('输入新分类名称:')
    if (name) {
      setCategories([
        ...categories,
        {
          id: Date.now().toString(),
          name,
          sites: []
        }
      ])
    }
  }

  // 导出数据
  const handleExport = () => {
    const dataStr = JSON.stringify(categories, null, 2)
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`
    
    const exportFileDefaultName = `nav-backup-${new Date().toISOString().slice(0, 10)}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  // 导入数据
  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    
    input.onchange = e => {
      const file = e.target.files[0]
      if (!file) return
      
      const reader = new FileReader()
      reader.onload = event => {
        try {
          const data = JSON.parse(event.target.result)
          if (Array.isArray(data)) {
            setCategories(data)
            alert('导入成功!')
          } else {
            throw new Error('数据格式不正确')
          }
        } catch (error) {
          alert('导入失败: ' + error.message)
        }
      }
      reader.readAsText(file)
    }
    
    input.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>我的导航网站</title>
        <meta name="description" content="个人导航网站" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">我的导航网站</h1>
          
          <div className="flex gap-2">
            <button 
              onClick={handleExport}
              className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded"
            >
              <FiDownload /> 导出
            </button>
            <button 
              onClick={handleImport}
              className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
            >
              <FiUpload /> 导入
            </button>
            <button 
              onClick={handleAddCategory}
              className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded"
            >
              <FiPlus /> 添加分类
            </button>
          </div>
        </div>

        {categories.map(category => (
          <SiteCategory 
            key={category.id}
            category={category}
            onAddSite={() => {
              setEditingSite(null)
              setShowModal(true)
            }}
            onEditSite={(site) => handleEditSite(site, category.id)}
            onDeleteSite={(siteId) => handleDeleteSite(siteId, category.id)}
            onSave={(site) => handleSaveSite(site, category.id)}
          />
        ))}
      </main>

      <footer className="mt-10 py-6 text-center text-gray-500">
        <p>© {new Date().getFullYear()} 我的导航网站 - 使用 Next.js 和 Vercel 构建</p>
      </footer>

      {showModal && (
        <AddSiteModal 
          onClose={() => {
            setShowModal(false)
            setEditingSite(null)
          }}
          onSave={(site) => handleSaveSite(site, editingSite ? editingSite.categoryId : categories[0].id)}
          editSite={editingSite?.site}
          categories={categories}
          selectedCategoryId={editingSite?.categoryId || categories[0].id}
        />
      )}
    </div>
  )
}
