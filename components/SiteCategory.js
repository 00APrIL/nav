import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'
import SiteCard from './SiteCard'

export default function SiteCategory({ category, onAddSite, onEditSite, onDeleteSite }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700">{category.name}</h2>
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
