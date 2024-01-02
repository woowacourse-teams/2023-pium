package com.official.pium.member.application;

import com.official.pium.member.domain.Member;
import com.official.pium.petPlant.domain.PetPlant;
import com.official.pium.history.repository.HistoryRepository;
import com.official.pium.member.repository.MemberRepository;
import com.official.pium.petPlant.repository.PetPlantRepository;
import com.official.pium.sessionGroup.repository.SessionGroupRepository;
import com.official.pium.notification.application.dto.NotificationCheckResponse;
import com.official.pium.notification.application.dto.NotificationSubscribeRequest;
import com.official.pium.member.application.dto.OAuthProvider;
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
    private final SessionGroupRepository sessionGroupRepository;
    private final OAuthProvider provider;

    @Transactional
    public void withdraw(Member member) {
        provider.withDraw(member.getKakaoId());

        List<PetPlant> petPlants = petPlantRepository.findAllByMemberId(member.getId());

        historyRepository.deleteAllByPetPlants(petPlants);

        petPlantRepository.deleteAllByMember(member);

        sessionGroupRepository.deleteBySessionValue(String.valueOf(member.getKakaoId()));
        memberRepository.deleteById(member.getId());
    }

    public NotificationCheckResponse checkNotification(Member member) {
        return NotificationCheckResponse.builder()
                .isSubscribe(member.isSubscribe())
                .build();
    }

    @Transactional
    public void subscribeNotification(Member member, NotificationSubscribeRequest request) {
        if (member.isSubscribe()) {
            throw new IllegalArgumentException("이미 알림을 구독하고 있습니다.");
        }
        member.updateDeviceToken(request.getToken());
    }

    @Transactional
    public void unSubscribeNotification(Member member) {
        if (!member.isSubscribe()) {
            throw new IllegalArgumentException("이미 알림을 구독하지 않고 있습니다.");
        }
        member.updateDeviceToken(null);
    }
}
