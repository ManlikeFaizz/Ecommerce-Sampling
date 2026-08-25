import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStorefront } from '../context/StorefrontContext'

const views = ['overview', 'products', 'inventory', 'collections', 'orders', 'featured']
const emptyProduct = { name: '', price: '', description: '', category: 'Shirts', collection: 'New Edit', color: '', fabric: 'Cotton', availability: 'In stock', image: '', sizes: 'S, M, L, XL', featured: false }
const demoOrders = [
  { id: 'NW-1048', customer: 'Private customer', items: '2 pieces', value: '₹5,998', date: '22 Aug 2026', status: 'Processing' },
  { id: 'NW-1047', customer: 'Private customer', items: '1 piece', value: '₹3,199', date: '21 Aug 2026', status: 'Pending' },
]

export default function AdminPage() {
  const navigate = useNavigate()
  const { isAdminAuthenticated, adminLogout, products, addProduct, updateProduct, deleteProduct, inventory, updateInventory, collections, toggleCollection, featuredProductIds, toggleFeatured } = useStorefront()
  const [activeView, setActiveView] = useState('overview')
  const [editingProduct, setEditingProduct] = useState(null)
  const [isProductFormOpen, setIsProductFormOpen] = useState(false)
  const [productForm, setProductForm] = useState(emptyProduct)
  const [feedback, setFeedback] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [orders, setOrders] = useState(demoOrders)

  useEffect(() => {
    if (!isAdminAuthenticated) navigate('/admin/login', { replace: true })
  }, [isAdminAuthenticated, navigate])

  if (!isAdminAuthenticated) return null

  const openProductForm = (product = null) => {
    setEditingProduct(product)
    setIsProductFormOpen(true)
    setProductForm(product ? { ...product, image: product.images?.[0] || '', sizes: product.sizes?.join(', ') || 'S, M, L, XL', featured: featuredProductIds.includes(product.id) } : emptyProduct)
    setFeedback('')
    setActiveView('products')
  }

  const updateForm = (event) => {
    const { name, value, type, checked } = event.target
    setProductForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }))
  }

  const submitProduct = (event) => {
    event.preventDefault()
    if (!event.currentTarget.checkValidity() || Number(productForm.price) < 0 || !productForm.sizes.trim()) {
      event.currentTarget.reportValidity()
      return
    }
    const product = { ...productForm, price: Number(productForm.price), images: [productForm.image], sizes: productForm.sizes.split(',').map((size) => size.trim()).filter(Boolean) }
    if (editingProduct) updateProduct({ ...product, id: editingProduct.id })
    else addProduct(product)
    setFeedback(editingProduct ? 'Product updated.' : 'Product created.')
    setEditingProduct(null)
    setIsProductFormOpen(false)
    setProductForm(emptyProduct)
  }

  const handleLogout = () => {
    adminLogout()
    navigate('/login')
  }

  return (
    <section className="page-section admin-page">
      <header className="admin-page__header">
        <div><p className="eyebrow">North &amp; Wick / Admin</p><h1>The back office.</h1><p className="admin-page__intro">A quiet place to manage the collection, orders, and storefront.</p></div>
        <button className="admin-page__logout" type="button" onClick={handleLogout}>Log out</button>
      </header>
      <nav className="admin-nav" aria-label="Admin sections">
        {views.map((view) => <button key={view} type="button" className={activeView === view ? 'is-active' : ''} onClick={() => setActiveView(view)}>{view === 'overview' ? 'Overview' : view === 'featured' ? 'Featured pieces' : view[0].toUpperCase() + view.slice(1)}</button>)}
      </nav>
      {activeView === 'overview' && <div className="admin-dashboard" aria-label="Admin overview">
        <AdminTile title="Products" value={`${products.length} pieces`} detail="Manage the current edit." onClick={() => setActiveView('products')} />
        <AdminTile title="Inventory" value="Local availability" detail="Review stock attention." onClick={() => setActiveView('inventory')} />
        <AdminTile title="Collections" value={`${collections.length} active edits`} detail="Shape the storefront story." onClick={() => setActiveView('collections')} />
        <AdminTile title="Recent orders" value="2 demo orders" detail="A quiet view of fulfillment." onClick={() => setActiveView('orders')} />
        <AdminTile title="Order management" value="Update statuses" detail="Keep every delivery moving." onClick={() => setActiveView('orders')} />
        <AdminTile title="Featured pieces" value={`${featuredProductIds.length} featured`} detail="Curate the first impression." onClick={() => setActiveView('featured')} />
      </div>}
      {activeView === 'products' && <ProductManagement products={products} form={productForm} editingProduct={editingProduct} isFormOpen={isProductFormOpen} feedback={feedback} onOpenForm={openProductForm} onChange={updateForm} onSubmit={submitProduct} onCancel={() => { setEditingProduct(null); setIsProductFormOpen(false); setProductForm(emptyProduct) }} onDelete={setDeleteTarget} />}
      {activeView === 'inventory' && <AdminListView eyebrow="Availability" title="Inventory" copy="Keep a clear view of pieces that need attention."><div className="admin-list">{products.map((product) => <div className="admin-list-row" key={product.id}><strong>{product.name}</strong><span>{inventory[product.id] || product.availability}</span><select className="select" value={inventory[product.id] || product.availability} onChange={(event) => updateInventory(product.id, event.target.value)}><option>In stock</option><option>Low stock</option><option>Unavailable</option></select></div>)}</div></AdminListView>}
      {activeView === 'collections' && <AdminListView eyebrow="Storefront organization" title="Collections" copy="Organize the collection with simple visibility controls."><div className="admin-list">{collections.map((collection) => <div className="admin-list-row" key={collection.name}><strong>{collection.name}</strong><span>{collection.visible ? 'Visible in storefront' : 'Hidden from storefront'}</span><button className="admin-inline-action" type="button" onClick={() => toggleCollection(collection.name)}>{collection.visible ? 'Hide' : 'Show'}</button></div>)}</div></AdminListView>}
      {activeView === 'orders' && <AdminListView eyebrow="Order record" title="Orders" copy="Demo order data is shown locally for this prototype."><div className="admin-list">{orders.map((order) => <div className="admin-list-row admin-list-row--order" key={order.id}><div><strong>{order.id}</strong><span>{order.customer} · {order.items} · {order.date}</span></div><strong>{order.value}</strong><select className="select" value={order.status} onChange={(event) => setOrders((current) => current.map((item) => item.id === order.id ? { ...item, status: event.target.value } : item))}><option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option></select></div>)}</div></AdminListView>}
      {activeView === 'featured' && <AdminListView eyebrow="Storefront curation" title="Featured pieces" copy="Choose which products lead the current storefront edit."><div className="admin-list">{products.map((product) => <div className="admin-list-row" key={product.id}><strong>{product.name}</strong><span>{featuredProductIds.includes(product.id) ? 'Featured' : 'Not featured'}</span><button className="admin-inline-action" type="button" onClick={() => toggleFeatured(product.id)}>{featuredProductIds.includes(product.id) ? 'Unfeature' : 'Feature'}</button></div>)}</div></AdminListView>}
      {deleteTarget && <div className="admin-confirm" role="dialog" aria-modal="true" aria-labelledby="delete-product-heading"><h2 id="delete-product-heading">Delete this product?</h2><p>{deleteTarget.name} will be removed from the current prototype catalogue.</p><div><button className="btn btn--secondary" type="button" onClick={() => setDeleteTarget(null)}>Cancel</button><button className="btn btn--primary" type="button" onClick={() => { deleteProduct(deleteTarget.id); setDeleteTarget(null); setFeedback('Product deleted.') }}>Delete</button></div></div>}
    </section>
  )
}

function AdminTile({ title, value, detail, onClick }) { return <button className="admin-tile" type="button" onClick={onClick}><p className="eyebrow">North &amp; Wick</p><h2>{title}</h2><strong>{value}</strong><p>{detail}</p></button> }

function ProductManagement({ products, form, editingProduct, isFormOpen, feedback, onOpenForm, onChange, onSubmit, onCancel, onDelete }) {
  return <div className="admin-management"><div className="admin-management__heading"><div><p className="eyebrow">Collection management</p><h2>Products</h2><p>Manage the pieces that appear across the storefront.</p></div><button className="btn btn--primary" type="button" onClick={() => onOpenForm()}>Add product</button></div>{feedback && <p className="admin-feedback" role="status">{feedback}</p>}{isFormOpen && <ProductForm form={form} editingProduct={editingProduct} onChange={onChange} onSubmit={onSubmit} onCancel={onCancel} />}{!isFormOpen && <div className="admin-product-list">{products.map((product) => <article className="admin-product-row" key={product.id}><img src={product.images?.[0]} alt="" /><div><h3>{product.name}</h3><p>{product.category} · {product.availability} · ₹{product.price}</p><span>{product.badge ? 'Featured' : 'Not featured'}</span></div><div><button className="admin-inline-action" type="button" onClick={() => onOpenForm(product)}>Edit</button><button className="admin-inline-action admin-inline-action--danger" type="button" onClick={() => onDelete(product)}>Delete</button></div></article>)}</div>}</div>
}

function ProductForm({ form, editingProduct, onChange, onSubmit, onCancel }) { return <form className="admin-product-form" onSubmit={onSubmit}><h3>{editingProduct ? 'Edit product' : 'New product'}</h3><label><span>Product name</span><input className="input" name="name" value={form.name} onChange={onChange} required /></label><label><span>Price</span><input className="input" name="price" type="number" min="0" value={form.price} onChange={onChange} required /></label><label><span>Description</span><textarea className="textarea" name="description" value={form.description} onChange={onChange} required /></label><div className="admin-product-form__grid"><label><span>Category</span><input className="input" name="category" value={form.category} onChange={onChange} required /></label><label><span>Collection</span><input className="input" name="collection" value={form.collection} onChange={onChange} required /></label><label><span>Colour</span><input className="input" name="color" value={form.color} onChange={onChange} required /></label><label><span>Availability</span><select className="select" name="availability" value={form.availability} onChange={onChange}><option>In stock</option><option>Limited</option><option>Unavailable</option></select></label></div><label><span>Primary image path</span><input className="input" type="text" name="image" value={form.image} onChange={onChange} placeholder="/catalogue/shirt-01.jpeg" required /></label><label><span>Available sizes</span><input className="input" name="sizes" value={form.sizes} onChange={onChange} required /></label><label className="admin-check"><input type="checkbox" name="featured" checked={form.featured} onChange={onChange} /><span>Featured piece</span></label><div className="admin-form-actions"><button className="btn btn--primary" type="submit">{editingProduct ? 'Save product' : 'Create product'}</button><button className="btn btn--secondary" type="button" onClick={onCancel}>Cancel</button></div></form> }

function AdminListView({ eyebrow, title, copy, children }) { return <div className="admin-management"><div className="admin-management__heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{copy}</p></div></div>{children}</div> }
