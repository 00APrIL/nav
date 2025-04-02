import { FiEdit2, FiTrash2 } from 'react-icons/fi'

export default function SiteCard({ site, onEdit, onDelete }) {
  if (!site) {
    return null; // 如果站点数据无效，不渲染任何内容
  }
  
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 flex flex-col">
      <a 
        href={site.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="flex-1 flex flex-col items-center text-center group"
      >
        <div className="text-4xl mb-2">{site.icon || '🔍'}</div>
        <h3 className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
          {site.name || '未命名站点'}
        </h3>
        <p className="text-xs text-gray-500 truncate w-full mt-1">
          {(site.url || '').replace(/^https?:\/\//, '').replace(/\/$/, '')}
        </p>
      </a>
      
      <div className="flex justify-center mt-4 pt-2 border-t border-gray-100">
        <button
          onClick={onEdit}
          className="text-gray-500 hover:text-blue-600 p-1 mx-1"
          title="编辑"
        >
          <FiEdit2 size={16} />
        </button>
        <button
          onClick={onDelete}
          className="text-gray-500 hover:text-red-600 p-1 mx-1"
          title="删除"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  )
}
