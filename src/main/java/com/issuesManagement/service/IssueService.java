package com.issuesManagement.service;

import com.issuesManagement.dto.IssueDto;
import com.issuesManagement.util.TPage;
import org.springframework.data.domain.Pageable;


public interface IssueService {

    IssueDto save(IssueDto issue);

    IssueDto getById(Long id);

    TPage<IssueDto> getAllPageable(Pageable pageable);

    Boolean delete(Long issue);

    IssueDto update(Long id, IssueDto issue);
}
