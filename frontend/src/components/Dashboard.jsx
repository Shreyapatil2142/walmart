// Dashboard Page
    const Dashboard = () => {
      const [products, setProducts] = React.useState([]);
      const [categoryFilter, setCategoryFilter] = React.useState('');
      const [lowStockOnly, setLowStockOnly] = React.useState(false);
      const [searchTerm, setSearchTerm] = React.useState('');
      const [loading, setLoading] = React.useState(true);
      
      React.useEffect(() => {
        // Simulate API call
        setTimeout(() => {
          // Mock data
          const mockProducts = [
            { id: 1, name: 'Wireless Headphones', sku: 'WH-001', category: 'Electronics', description: 'Noise cancelling wireless headphones', stock: 15 },
            { id: 2, name: 'Cotton T-Shirt', sku: 'CT-002', category: 'Apparel', description: 'Plain white cotton t-shirt', stock: 8 },
            { id: 3, name: 'Ceramic Mug', sku: 'CM-003', category: 'Kitchenware', description: '12oz ceramic coffee mug', stock: 3 },
            { id: 4, name: 'Desk Lamp', sku: 'DL-004', category: 'Home Goods', description: 'Adjustable LED desk lamp', stock: 12 },
            { id: 5, name: 'Protein Powder', sku: 'PP-005', category: 'Health', description: 'Whey protein isolate', stock: 6 },
          ];
          setProducts(mockProducts);
          setLoading(false);
          
          // Initialize charts after data is loaded
          initializeCharts();
        }, 1000);
      }, []);

      const initializeCharts = () => {
        // Sales Trend Chart
        const trendCtx = document.getElementById('salesTrendChart');
        if (trendCtx) {
          new Chart(trendCtx, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              datasets: [{
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 90],
                borderColor: 'rgb(79, 70, 229)',
                tension: 0.1,
                fill: false
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: 'Monthly Sales Trend'
                }
              }
            }
          });
        }
        
        // Inventory Heatmap Chart
        const heatmapCtx = document.getElementById('inventoryHeatmapChart');
        if (heatmapCtx) {
          new Chart(heatmapCtx, {
            type: 'bar',
            data: {
              labels: ['Store A', 'Store B', 'Store C', 'Store D'],
              datasets: [
                {
                  label: 'Electronics',
                  data: [15, 8, 12, 5],
                  backgroundColor: 'rgba(79, 70, 229, 0.6)'
                },
                {
                  label: 'Apparel',
                  data: [8, 20, 15, 10],
                  backgroundColor: 'rgba(16, 185, 129, 0.6)'
                },
                {
                  label: 'Kitchenware',
                  data: [3, 7, 5, 9],
                  backgroundColor: 'rgba(245, 158, 11, 0.6)'
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                title: {
                  display: true,
                  text: 'Stock Levels by Store'
                }
              },
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true
                }
              }
            }
          });
        }
      };

      const filteredProducts = products.filter(product => {
        return (
          (searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.sku.toLowerCase().includes(searchTerm.toLowerCase())) &&
          (categoryFilter === '' || product.category === categoryFilter) &&
          (!lowStockOnly || product.stock < 10)
        );
      });

      const categories = [...new Set(products.map(p => p.category))];

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <div className="text-sm text-gray-500">Last updated: {new Date().toLocaleString()}</div>
          </div>
          
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <i className="fas fa-box fa-2x"></i>
                </div>
                <div className="ml-4">
                  <p className="text-gray-500">Total Products</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <i className="fas fa-store fa-2x"></i>
                </div>
                <div className="ml-4">
                  <p className="text-gray-500">Total Stores</p>
                  <p className="text-2xl font-bold">4</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <i className="fas fa-exclamation-triangle fa-2x"></i>
                </div>
                <div className="ml-4">
                  <p className="text-gray-500">Low Stock Items</p>
                  <p className="text-2xl font-bold">{products.filter(p => p.stock < 10).length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-red-100 text-red-600">
                  <i className="fas fa-skull fa-2x"></i>
                </div>
                <div className="ml-4">
                  <p className="text-gray-500">Dead Stock</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="h-64">
                <canvas id="salesTrendChart"></canvas>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="h-64">
                <canvas id="inventoryHeatmapChart"></canvas>
              </div>
            </div>
          </div>
          
          {/* Products Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="text-lg font-medium text-gray-800">Inventory Overview</h3>
              
              <div className="mt-4 flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="sm:w-48">
                  <select 
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox"
                    id="lowStockFilter"
                    checked={lowStockOnly}
                    onChange={e => setLowStockOnly(e.target.checked)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="lowStockFilter" className="ml-2 text-sm text-gray-700">
                    Low Stock Only
                  </label>
                </div>
              </div>
            </div>
            
            {loading ? (
              <div className="p-8 text-center">
                <div className="spinner mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading products...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map(product => (
                        <tr key={product.id} className={product.stock < 10 ? 'low-stock' : ''}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{product.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.sku}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                          <td className="px-6 py-4 text-sm text-gray-500">{product.description}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${product.stock < 10 ? 'text-red-600' : 'text-gray-900'}`}>
                              {product.stock} units
                              {product.stock < 10 && <i className="fas fa-exclamation-circle ml-2"></i>}
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                          No products match your filters
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          {/* Dead Stock Preview */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-gray-800">Dead Stock Items</h3>
                <button 
                  className="text-indigo-600 hover:text-indigo-800" 
                  onClick={() => document.getElementById('deadInventoryTab').click()}
                >
                  See All <i className="fas fa-arrow-right ml-1"></i>
                </button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Sale</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty In Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Suggested Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Ceramic Mug</div>
                      <div className="text-sm text-gray-500">CM-003</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">45 days ago</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3 units</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Bundle with coffee beans
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">Protein Powder</div>
                      <div className="text-sm text-gray-500">PP-005</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">38 days ago</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">6 units</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                        Flash sale (approaching expiry)
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    };
export default Dashboard;