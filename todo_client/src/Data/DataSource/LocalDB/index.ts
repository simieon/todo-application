
async function db<T>(apiEndpoint: string) {
  return {
    getAll: async () => {
      try {
        const response = await fetch(apiEndpoint, {headers: {'Content-Type': 'application/json'}})
        if (response.ok) {
          const data = await response.json()
          return data as T[]
        } else {
          throw new Error(`Failed to fetch data from API. Status: ${response.status}`)
        }
      } catch (error) {
        throw new Error(`Error fetching data: ${error}`)
      }
    },

    getById: async (itemId: number) => {
      try {
        const response = await fetch(`${apiEndpoint}/${itemId}`, {headers: {'Content-Type': 'application/json'}})
        if (response.ok) {
          const data = await response.json()
          return data as T
        } else {
          throw new Error(`Failed to fetch item from API. Status: ${response.status}`)
        }
      } catch (error) {
        throw new Error(`Error fetching item: ${error}`)
      }
    },

    removeById: async (itemId: number) => {
      try {
        const response = await fetch(`${apiEndpoint}/${itemId}`, {
          method: 'DELETE',
          headers: {'Content-Type': 'application/json'}
        })
        if (response.ok) {
          return true
        } else {
          throw new Error(`Failed to delete item. Status: ${response.status}`)
        }
      } catch (error) {
        throw new Error(`Error deleting item: ${error}`)
      }
    },

    create: async (params: T) => {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(params),
        })
        if (response.ok) {
          const data = await response.json()
          return data.instance
        } else {
          throw new Error(`Failed to create item. Status: ${response.status}`)
        }
      } catch (error) {
        throw new Error(`Error creating item: ${error}`)
      }
    },

    updateByField: async (itemId: number) => {
      try {
        const response = await fetch(`${apiEndpoint}/${itemId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (response.ok) {
          const data = await response.json()
          return data.instance as T
        } else {
          throw new Error(`Failed to update item. Status: ${response}`)
        }
      } catch (error) {
        throw new Error(`Error updating item: ${error}`)
      }
    },
  }
}

export default db