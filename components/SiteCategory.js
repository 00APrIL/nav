import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import SiteCard from './SiteCard'

export default function SiteCategory({ 
  category, 
  onAddSite, 
  onEditSite, 
  onDeleteSite, 
  onEditCategory, 
  onDeleteCategory 
}) {
  if (!category || !category.sites) {
    return null; // 如果分类数据无效，不渲染任何内容
  }
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <h2 className="text-xl font-semibold text-gray-700 mr-2">{category.name}</h2>
          
          {/* 新增：分类编辑和删除按钮 */}
          <button 
            onClick={onEditCategory}
            className="text-gray-500 hover:text-blue-600 p-1"
            title="编辑分类"
          >
            <FiEdit2 size={16} />
          </button>
          <button 
            onClick={onDeleteCategory}
            className="text-gray-500 hover:text-red-600 p-1"
            title="删除分类"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
        <button 
          onClick={onAddSite}
          className="flex items-center gap-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          <FiPlus size={16} /> 添加网站
        </button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {category.sites.map(site => (
          <SiteCard 
            key={site.id} 
            site={site} 
            onEdit={() => onEditSite(site)}
            onDelete={() => onDeleteSite(site.id)}
          />
        ))}
      </div>
    </div>
  )
}
