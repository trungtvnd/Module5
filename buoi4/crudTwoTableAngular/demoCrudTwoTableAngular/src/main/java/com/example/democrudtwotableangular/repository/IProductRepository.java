package com.example.democrudtwotableangular.repository;


import com.example.democrudtwotableangular.model.Product;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface IProductRepository extends PagingAndSortingRepository<Product, Long> {
    Iterable<Product> findAllByNameContaining(String name);
}
