package com.official.pium.repository;

import com.official.pium.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;

interface MemberRepository extends JpaRepository<Member, Long> {
}
