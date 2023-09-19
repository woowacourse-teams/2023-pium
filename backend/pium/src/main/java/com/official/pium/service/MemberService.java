package com.official.pium.service;

import com.official.pium.domain.Member;
import com.official.pium.domain.PetPlant;
import com.official.pium.repository.HistoryRepository;
import com.official.pium.repository.MemberRepository;
import com.official.pium.repository.PetPlantRepository;
import com.official.pium.service.dto.OAuthProvider;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final HistoryRepository historyRepository;
    private final PetPlantRepository petPlantRepository;
    private final OAuthProvider provider;

    @Transactional
    public void withdraw(Member member) {
        provider.withDraw(member.getKakaoId());

        List<PetPlant> petPlants = petPlantRepository.findAllByMemberId(member.getId());

        historyRepository.deleteAllByPetPlants(petPlants);

        petPlantRepository.deleteAllByMember(member);

        memberRepository.deleteById(member.getId());
    }
}
