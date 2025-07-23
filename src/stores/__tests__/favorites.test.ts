import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useFavoritesStore } from '../favorites'

const mockMovie = { id: 1, title: 'Test Movie' }

global.localStorage = {
  getItem: vi.fn(() => null),
  setItem: vi.fn(),
  removeItem: vi.fn(),
} as any

describe('favorites store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it('ajoute un favori', () => {
    const store = useFavoritesStore()
    store.addFavorite(mockMovie as any)
    expect(store.favorites).toHaveLength(1)
    expect(store.favorites[0].id).toBe(1)
  })

  it('ne duplique pas un favori', () => {
    const store = useFavoritesStore()
    store.addFavorite(mockMovie as any)
    store.addFavorite(mockMovie as any)
    expect(store.favorites).toHaveLength(1)
  })

  it('supprime un favori', () => {
    const store = useFavoritesStore()
    store.addFavorite(mockMovie as any)
    store.removeFavorite(1)
    expect(store.favorites).toHaveLength(0)
  })

  it('toggle ajoute puis supprime', () => {
    const store = useFavoritesStore()
    store.toggleFavorite(mockMovie as any)
    expect(store.favorites).toHaveLength(1)
    store.toggleFavorite(mockMovie as any)
    expect(store.favorites).toHaveLength(0)
  })

  it('clearFavorites vide la liste', () => {
    const store = useFavoritesStore()
    store.addFavorite(mockMovie as any)
    store.clearFavorites()
    expect(store.favorites).toHaveLength(0)
  })
})
