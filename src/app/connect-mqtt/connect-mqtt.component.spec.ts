import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectMqttComponent } from './connect-mqtt.component';

describe('ConnectMqttComponent', () => {
  let component: ConnectMqttComponent;
  let fixture: ComponentFixture<ConnectMqttComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectMqttComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectMqttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
