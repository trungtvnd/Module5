package com.codegym.vn.democrud2tableangularsecurity.service.product;



import com.codegym.vn.democrud2tableangularsecurity.model.product.Category;
import com.codegym.vn.democrud2tableangularsecurity.model.product.Product;
import com.codegym.vn.democrud2tableangularsecurity.repository.product.ICategoryRepository;
import com.codegym.vn.democrud2tableangularsecurity.repository.product.IProductRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class ProductService implements IProductService{
    @Autowired
    IProductRepository repository;
    @Autowired
    ICategoryRepository categoryRepository;
    @Override
    public Iterable<Product> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Product> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Product save(Product product) {
        return repository.save(product);
    }

    @Override
    public void delete(Long id) {
    repository.deleteById(id);
    }

    @Override
    public Iterable<Product> findAllByName(String name) {
        return repository.findAllByNameContaining(name);
    }

    @Override
    public Iterable<Category> findAllCategory() {
        return categoryRepository.findAll();
    }


    @Override
    public Page<Product> findPage(Pageable pageable) {
        return repository.findAll(pageable);
    }
}
