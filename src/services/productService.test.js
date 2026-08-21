import test from 'node:test'
import assert from 'node:assert/strict'
import { productService } from './productService.js'

test('expanded catalogue exposes more than the original six products', () => {
  const products = productService.getProducts()

  assert.ok(products.length >= 12, `Expected at least 12 products, received ${products.length}`)
  assert.ok(productService.getProductById('copper-drift-shirt'))
  assert.ok(productService.getProductById('smoked-olive-shirt'))
})
