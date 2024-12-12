import { DB_CONFIG } from './constants'

export class EditorDB {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(DB_CONFIG.stores.content)) {
          db.createObjectStore(DB_CONFIG.stores.content, { keyPath: 'id' })
        }
      }
    })
  }

  async saveContent(id: string, content: string): Promise<void> {
    if (!this.db) await this.init()
    
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([DB_CONFIG.stores.content], 'readwrite')
      const store = transaction.objectStore(DB_CONFIG.stores.content)
      const request = store.put({ id, content })

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async getContent(id: string): Promise<string> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([DB_CONFIG.stores.content], 'readonly')
      const store = transaction.objectStore(DB_CONFIG.stores.content)
      const request = store.get(id)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        resolve(request.result?.content || '')
      }
    })
  }
}