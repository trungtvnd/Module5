package com.example.democrudtwotableangular.repository;

import com.example.democrudtwotableangular.model.Category;
import org.springframework.data.repository.CrudRepository;

public interface ICategoryRepository extends CrudRepository<Category, Long> {

}
